import './Footer.css';

export default function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3">
      &copy; {new Date().getFullYear()} MyShop. All Rights Reserved.
    </footer>
  );
}
