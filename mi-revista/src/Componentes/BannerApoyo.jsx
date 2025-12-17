export default function BannerApoyo() {
  return (
    <div
      className="my-20 bg-gradient-to-r from-morena-garnet to-morena-bronze
                 p-10 rounded-[3rem] text-center"
    >
      <h3 className="text-4xl font-romance mb-4 text-black">
        Apoya a Revista Morena ✨
      </h3>

      <p className="max-w-xl mx-auto mb-6 text-black/80 text-lg">
        Este proyecto celebra la belleza real y la cultura latina.
        Si te inspira, puedes apoyarlo 💖
      </p>

      <button
        onClick={() =>
          alert("Yape al número: 9XX XXX XXX\nGracias por apoyar 💜")
        }
        className="bg-black text-white px-8 py-3 rounded-full
                   font-semibold hover:scale-105 transition inline-block"
      >
        Apoyar ahora
      </button>
    </div>
  );
}
