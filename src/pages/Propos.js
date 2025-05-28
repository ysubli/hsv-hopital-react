import React from 'react';
import '../styles/Propos.css';

const Propos = () => {
  return (
    <div className="propos-container">
      {/* Hero Section */}
      <section className="propos-hero">
        <div className="hero-content">
          <h1>À Propos de Nous</h1>
          <p>Votre santé, notre priorité depuis 2017</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="propos-section mission-section">
        <div className="section-header">
          <h2>Notre Mission</h2>
        </div>
        <div className="section-content">
          <div className="text-content">
            <p>
              L'Hôpital HSV s'engage à offrir des soins médicaux de haute qualité dans un 
              environnement moderne et sécurisé. Notre équipe de professionnels dévoués 
              travaille sans relâche pour assurer votre bien-être et votre sécurité.
            </p>
            <p>
              Notre priorité absolue est d'assurer la sécurité de nos patients tout en 
              leur fournissant les meilleurs soins médicaux possibles. En tant qu'établissement 
              de santé moderne, nous utilisons des technologies de pointe pour garantir 
              des traitements efficaces et sécurisés.
            </p>
          </div>
          <div className="image-container">
            <img src="/images/mission.jpg" alt="Notre mission" className="section-image" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="propos-section values-section">
        <div className="section-header">
          <h2>Nos Valeurs</h2>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <h3>Qualité</h3>
            <p>Nous visons l'excellence et la qualité dans chaque aspect de nos services médicaux et de notre prise en charge des patients.</p>
          </div>
          <div className="value-card">
            <h3>Sécurité</h3>
            <p>La sécurité des patients est notre priorité absolue, guidant chacune de nos décisions et procédures.</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>En tant qu'établissement moderne, nous adoptons les dernières avancées médicales pour offrir les meilleurs soins possibles.</p>
          </div>
          <div className="value-card">
            <h3>Intégrité</h3>
            <p>Nous agissons avec honnêteté, transparence et responsabilité dans toutes nos interactions.</p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="propos-section history-section">
        <div className="section-header">
          <h2>Notre Histoire</h2>
        </div>
        <div className="section-content reversed">
          <div className="image-container">
            <img src="/images/facade-hsv.jpg" alt="Notre histoire" className="section-image" />
          </div>
          <div className="text-content">
            <div className="timeline">
              <div className="timeline-item">
                <div className="year">2017</div>
                <div className="event">Ouverture officielle de l'Hôpital HSV, un établissement de santé moderne</div>
              </div>
              <div className="timeline-item">
                <div className="year">2018</div>
                <div className="event">Mise en place du système de sécurité des patients avancé</div>
              </div>
              <div className="timeline-item">
                <div className="year">2019</div>
                <div className="event">Inauguration du centre de soins spécialisés</div>
              </div>
              <div className="timeline-item">
                <div className="year">2021</div>
                <div className="event">Expansion des installations et modernisation des équipements</div>
              </div>
              <div className="timeline-item">
                <div className="year">2023</div>
                <div className="event">Intégration des technologies médicales de pointe pour améliorer la qualité des soins</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="propos-section team-section">
        <div className="section-header">
          <h2>Notre Équipe</h2>
        </div>
        <p className="team-intro">
          Notre équipe est composée de professionnels dévoués et hautement qualifiés, 
          déterminés à fournir des soins de haute qualité tout en garantissant la sécurité de nos patients.
        </p>
        <div className="team-cards">
          <div className="team-card">
            <div className="team-img-container">
              <img src="/images/doctor1.jpeg" alt="Dr. Sophie Martin" />
            </div>
            <h3>Dr. Sophie Martin</h3>
            <p>Directrice Médicale</p>
          </div>
          <div className="team-card">
            <div className="team-img-container">
              <img src="/images/doctor2.jpg" alt="Dr. Thomas Bernard" />
            </div>
            <h3>Dr. Thomas Bernard</h3>
            <p>Chef de Cardiologie</p>
          </div>
          <div className="team-card">
            <div className="team-img-container">
              <img src="/images/doctor3.jpg" alt="Dr. Claire Dubois" />
            </div>
            <h3>Dr. Claire Dubois</h3>
            <p>Chef de Pédiatrie</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="propos-section contact-section">
        <div className="section-header">
          <h2>Nous Contacter</h2>
        </div>
        <div className="contact-map-container">
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4802.5796840587955!2d2.2615608999999997!3d48.8903295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6657232404e9f%3A0xe2cd1394191aa3c4!2sCentre%20Hospitalier%20Rives%20De%20Seine!5e1!3m2!1sfr!2sfr!4v1748430485207!5m2!1sfr!2sfr" 
              width="100%" 
              height="450" 
              className="hospital-map"
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation de l'Hôpital HSV"
            ></iframe>
          </div>
          <div className="contact-info">
            <h3>Coordonnées</h3>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Adresse:</strong>
                <p>Centre Hospitalier Rives De Seine, 92700 Colombes</p>
              </div>
              <div className="contact-item">
                <strong>Téléphone:</strong>
                <p>01 23 45 67 89</p>
              </div>
              <div className="contact-item">
                <strong>Email:</strong>
                <p>contact@hopital-hsv.fr</p>
              </div>
              <div className="contact-item">
                <strong>Horaires:</strong>
                <p>Ouvert 24h/24, 7j/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Propos;
