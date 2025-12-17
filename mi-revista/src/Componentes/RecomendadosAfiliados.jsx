import { Link } from "react-router-dom";

export default function RecomendadosAfiliados() {
  const productos = [
    {
      id: 1,
      titulo: "Labial nude cálido",
      descripcion: "Perfecto para piel morena",
      link: "https://www.maybelline.pe/todos-los-productos/maquillaje-para-labios/labiales/color-labios-color-sensational?variant=Rum+Riche",
      imagen: "/labial.jpg",
    },
    {
      id: 2,
      titulo: "Aceite corporal iluminador",
      descripcion: "Brillo natural y elegante",
      link: "https://www.natura.com.pe/p/oleo-trifasico-desodorante-corporal-ekos-andiroba-200-ml/NATPER-97430?listTitle=search+results+list+showcase+-+aceite+corporal&position=5&color=",
      imagen: "/aceite.jpg",
    },
  ];

  return (
    <section className="mt-16 p-6 rounded-3xl bg-morena-cream">
      <h3 className="text-3xl font-romance mb-8 text-morena-garnet text-center">
        🛍️ Productos Recomendados por Morena
      </h3>

      <div className="grid sm:grid-cols-2 gap-6">
        {productos.map((p) => (
          <a
            key={p.id}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            title={`Ver ${p.titulo}`}
            className="flex gap-4 bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <img
              src={p.imagen}
              alt={p.titulo}
              className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-xl border border-gray-200 shadow-sm"
            />

            <div className="flex flex-col justify-between">
              <div>
                <h4 className="font-semibold text-lg">{p.titulo}</h4>
                <p className="text-sm text-gray-600 mt-1">{p.descripcion}</p>
              </div>

              <span className="mt-3 text-sm font-bold text-yellow-500 hover:text-yellow-600 transition-colors">
                Comprar ahora →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
