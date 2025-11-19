import React from 'react';
import './index.css'; // Importa o CSS da página

function AjudaPage() {
  return (
    <div className="ajuda-container">
      <h1 className="main-title">Ajuda</h1>
      
      <div className="ajuda-content">
        <h2 className="section-title">Perguntas Frequentes</h2>

       
        <details className="faq-item">
          <summary className="faq-question">
            Como faço para rastrear meu pedido?
          </summary>
          <div className="faq-answer">
            <p>Assim que seu pedido for enviado, você receberá um e-mail de confirmação com um código de rastreio. Você pode usar esse código no site da transportadora para acompanhar a entrega.</p>
          </div>
        </details>

        
        <details className="faq-item">
          <summary className="faq-question">
            Esqueci minha senha, e agora?
          </summary>
          <div className="faq-answer">
            <p>Não se preocupe! Na página de <a href="/perfil">Login</a>, clique no link "Esqueceu sua senha?" e siga as instruções. Enviaremos um link para seu e-mail para que você possa criar uma nova.</p>
          </div>
        </details>

       
        <details className="faq-item">
          <summary className="faq-question">
            Quais formas de pagamento são aceitas?
          </summary>
          <div className="faq-answer">
            <p>Atualmente, aceitamos Cartão de Crédito (Visa, Master, Elo) e PIX. Todas as transações são seguras e criptografadas.</p>
          </div>
        </details>

     
        <details className="faq-item">
          <summary className="faq-question">
            Como funciona a política de troca?
          </summary>
          <div className="faq-answer">
            <p>Você tem até 7 dias corridos após o recebimento para solicitar uma troca ou devolução. O produto deve estar em perfeitas condições e com a etiqueta. Entre em contato com nosso suporte para iniciar o processo.</p>
          </div>
        </details>
      </div>
    </div>
  );
}

export default AjudaPage;