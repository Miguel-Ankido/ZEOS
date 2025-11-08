import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Cria o Contexto
const CartContext = createContext();

// 2. Cria o Provedor (o "Cérebro")
export const CartProvider = ({ children }) => {
  // Tenta carregar o carrinho do localStorage ao iniciar
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('zeosCart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Falha ao carregar o carrinho do localStorage:", error);
      return [];
    }
  });

  // Salva no localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem('zeosCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Adiciona um item (ou aumenta a quantidade)
  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id);
      
      if (itemExists) {
        // Se já existe, atualiza a quantidade
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Se não existe, adiciona o produto
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove 1 da quantidade
  const decrementItem = (productId) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === productId);
      // Se a quantidade é 1, remove o item
      if (item && item.quantity === 1) {
        return prevItems.filter(item => item.id !== productId);
      } else {
        // Se for > 1, apenas diminui
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  // Remove o item completamente
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Calcula o subtotal
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      // Remove "R$ " e troca "," por "." para calcular
      const price = parseFloat(item.price.replace(',', '.'));
      return total + (price * item.quantity);
    }, 0);
  };

  // --- ADICIONE ESTA FUNÇÃO ---
  // Limpa o carrinho
  const clearCart = () => {
    setCartItems([]);
  };
  // --- FIM DA ADIÇÃO ---

  // 3. Fornece os dados e funções para o resto do app
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decrementItem,
        removeFromCart,
        getSubtotal,
        clearCart // <-- ADICIONE AQUI
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 4. Hook customizado (para facilitar o uso)
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  return useContext(CartContext);
};