function CompartirRedes({ titulo }) {
  const url = window.location.href;

  const compartirWhatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(titulo)}%20${url}`);
  };

  const compartirFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  };

  const copiarLink = async () => {
    await navigator.clipboard.writeText(url);
    alert("¡Link copiado! 📎");
  };

  return (
    <div className="mt-10 flex gap-4 items-center">
      <button
        onClick={compartirWhatsapp}
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        WhatsApp
      </button>

      <button
        onClick={compartirFacebook}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Facebook
      </button>

      <button
        onClick={copiarLink}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg"
      >
        Copiar link 📎
      </button>
    </div>
  );
}

export default CompartirRedes;
