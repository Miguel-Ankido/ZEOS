import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./index.css";
// (Corrigi o import para apontar para o .jsx se o seu StarRating não tiver um index.js)
import StarRating from "../../componentes/StarRating/index.jsx";
import { useCart } from "../../context/CartContext.jsx"; // 1. Importe o hook do carrinho

function ProdutoPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // 2. Pegue a função 'addToCart'

  // 3. Estados para o formulário de avaliação
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");

  // Tenta pegar o e-mail do usuário logado (se houver)
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setReviewEmail(JSON.parse(user).email);
      setReviewName(JSON.parse(user).nomeCompleto);
    }
  }, []);

  // !! SUA URL DO RENDER !!
  const API_URL = "https://api-1-6p1t.onrender.com";

  // 4. Função para buscar os dados (produto E reviews)
  const fetchData = async () => {
    setLoading(true);
    try {
      // Busca produto
      const productResponse = await fetch(`${API_URL}/produtos/${id}`);
      // Verifica se o produto existe
      if (!productResponse.ok) {
        throw new Error("Produto não encontrado");
      }
      const productData = await productResponse.json();
      setProduct(productData);

      // Busca reviews
      await fetchProductReviews();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar o produto.");
    } finally {
      setLoading(false);
    }
  };

  // 5. Função separada para buscar SÓ os reviews (para podermos recarregar)
  const fetchProductReviews = async () => {
    try {
      const reviewsResponse = await fetch(`${API_URL}/reviews?produtoId=${id}`);
      const reviewsData = await reviewsResponse.json();
      setReviews(reviewsData);
    } catch (error) {
      // ADICIONE ESTA LINHA:
      console.error("Erro ao carregar avaliações:", error);
      
      toast.error("Erro ao carregar avaliações.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [id]);

  // 6. LÓGICA DE ADICIONAR AO CARRINHO (Atualizada)
  const handleAddToCart = () => {
    addToCart(product, quantity); // Usa o 'cérebro' do carrinho
    toast.success(`${quantity} "${product.name}" adicionado(s) ao carrinho!`);
  };

  // 7. LÓGICA DE ENVIAR AVALIAÇÃO (Atualizada)
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (reviewRating === 0) {
      toast.warn("Por favor, selecione uma avaliação (estrelas).");
      return;
    }

    const newReview = {
      produtoId: id, // Liga a avaliação a este produto
      nome: reviewName,
      email: reviewEmail,
      rating: reviewRating,
      // (Poderíamos adicionar um campo de 'comentário' também)
    };

    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        toast.success("Avaliação enviada com sucesso!");
        fetchProductReviews(); // Recarrega a lista de avaliações
        // Limpa o formulário
        setReviewRating(0);
        // (Não limpa o nome e e-mail se o usuário estiver logado)
      } else {
        throw new Error("Falha ao enviar avaliação");
      }
    } catch (error) {
      // ADICIONE ESTA LINHA:
      console.error("Erro ao enviar avaliação:", error); 
      
      toast.error('Erro ao enviar avaliação.');
    }
  };

  // Funções increaseQty, decreaseQty
  const increaseQty = () => {
    if (product.estoque && quantity < product.estoque)
      setQuantity((q) => q + 1);
    else if (!product.estoque) setQuantity((q) => q + 1);
  };
  const decreaseQty = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  // --- CORREÇÃO DE SEGURANÇA ---
  if (loading) {
    return <div className="produto-container-loading">Carregando...</div>;
  }

  // Se o loading terminou E o produto continua nulo (erro no fetch),
  // mostre o erro antes de tentar renderizar 'product.image'
  if (!product) {
    return (
      <div className="produto-container-loading">Produto não encontrado.</div>
    );
  }
  // --- FIM DA CORREÇÃO ---

  return (
    <div className="produto-container">
      {/* --- SEÇÃO SUPERIOR (PRODUTO) --- */}
      <div className="produto-layout">
        <div className="produto-imagem">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="produto-info">
          <h1 className="produto-nome">{product.name}</h1>
          <div className="produto-preco">
            {product.oldPrice && (
              <span className="old-price">{product.oldPrice}</span>
            )}
            <span className="current-price">R$ {product.price}</span>
          </div>
          <StarRating rating={product.rating} />
          <p className="produto-descricao-curta">{product.descricao_curta}</p>
          <p className="produto-estoque">
            {product.estoque ? `${product.estoque} em estoque` : "Disponível"}
          </p>
          <div className="produto-acoes">
            <div className="quantity-selector">
              <button onClick={decreaseQty}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={increaseQty}>+</button>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Adicionar ao carrinho
            </button>
          </div>
          <div className="produto-meta">
            <span>SKU: {product.sku}</span>
            <span>Categoria: {product.categoria}</span>
          </div>
        </div>
      </div>

      {/* --- SEÇÃO INFERIOR (ABAS) --- */}
      <div className="produto-abas">
        <div className="aba-descricao">
          <h2>Descrição</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{product.descricao_longa}</p>
          <p>
            <strong>Material do Produto:</strong> {product.material}
          </p>
        </div>

        {/* 8. FORMULÁRIO DE AVALIAÇÃO (Atualizado) */}
        <div className="aba-avaliacoes">
          <h2>Avaliações ({reviews.length})</h2>
          {reviews.length === 0 ? (
            <p>Não há avaliações ainda.</p>
          ) : (
            <p>Mostrando {reviews.length} avaliações...</p>
            // (Aqui fariamos um .map() nas 'reviews')
          )}

          <div className="review-form-container">
            <h3>Seja o primeiro a avaliar "{product.name}"</h3>
            <p>
              O seu endereço de e-mail não será publicado. Campos obrigatórios
              são marcados com *
            </p>

            <form onSubmit={handleSubmitReview} className="review-form">
              <label>Sua avaliação *</label>
              <StarRating
                rating={reviewRating}
                onRatingChange={setReviewRating}
              />

              <label htmlFor="review-nome">Nome *</label>
              <input
                type="text"
                id="review-nome"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                required
              />

              <label htmlFor="review-email">E-mail *</label>
              <input
                type="email"
                id="review-email"
                value={reviewEmail}
                onChange={(e) => setReviewEmail(e.target.value)}
                required
              />

              <button type="submit" className="form-button">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdutoPage;
