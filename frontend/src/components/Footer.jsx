import { assets, footerLinks } from "../lib/foodclick";

function Footer() {
  return (
    <footer className="fc-footer">
      <div className="footer-inner">
        <div className="footer-content">
          <div className="footer-socials">
            <img src={assets.vkIcon} alt="VK" />
            <img src={assets.rutubeIcon} alt="Rutube" />
            <img src={assets.telegramIcon} alt="Telegram" />
          </div>

          <nav className="footer-links">
            {footerLinks.map((item) => (
              <a key={item} href="#footer-link">
                {item}
              </a>
            ))}
          </nav>
        </div>

        <img className="footer-courier" src={assets.courierArt} alt="" />
      </div>
    </footer>
  );
}

export default Footer;
