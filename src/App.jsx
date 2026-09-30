import { useState } from 'react';
import { Coffee, Heart, Send, CheckCircle2, RotateCcw } from 'lucide-react';
import logo from './assets/logo.png';

const FEEDBACK_API_URL =
  import.meta.env.VITE_FEEDBACK_API_URL ||
  'https://script.google.com/macros/s/AKfycbwyMSvKeIa_SWK_yiv3C2ESZlkQQlzZt-06rXc8ohECbeMOD_-XRZNw78ltKUM4opdP/exec';

const WHATSAPP_URL =
  import.meta.env.VITE_WHATSAPP_URL ||
  'https://wa.me/5493876012295?text=Hola!%20Quer%C3%ADa%20comunicarme%20directamente%20con%20ustedes%20por%20una%20consulta%20o%20sugerencia%20sobre%20Filipo.';

const OPCIONES_UBICACION = ['Arriba', 'Abajo', 'Vereda'];

const OPCIONES_ATENCION = [
  'De diez, unos genios',
  'Bien, sin problemas',
  'Medio flojo / desatentos',
];

const OPCIONES_COMIDA = [
  'Riquísimo todo',
  'Estuvo bien',
  'No me convenció',
];

const OPCIONES_DEMORA = [
  'Al toque',
  'Normal',
  'Se demoró bastante',
];

const PUNTAJES = {
  'De diez, unos genios': 3,
  'Bien, sin problemas': 2,
  'Medio flojo / desatentos': 1,
  'Riquísimo todo': 3,
  'Estuvo bien': 2,
  'No me convenció': 1,
  'Al toque': 3,
  'Normal': 2,
  'Se demoró bastante': 1,
};

export default function App() {
  const [mesa, setMesa] = useState('');
  const [atencion, setAtencion] = useState('');
  const [comida, setComida] = useState('');
  const [demora, setDemora] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(null);

  const handleReset = () => {
    setMesa('');
    setAtencion('');
    setComida('');
    setDemora('');
    setMensaje('');
    setErrorEnvio(null);
    setEnviado(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enviando) return;

    setEnviando(true);
    setErrorEnvio(null);

    const now = new Date();
    const hora = now.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const fecha = now.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const fechaHora = `${fecha} ${hora}`;

    const puntajeAtencion = atencion && PUNTAJES[atencion] !== undefined ? PUNTAJES[atencion] : '';
    const puntajeComida = comida && PUNTAJES[comida] !== undefined ? PUNTAJES[comida] : '';
    const puntajeDemora = demora && PUNTAJES[demora] !== undefined ? PUNTAJES[demora] : '';

    const puntuacionesRespondidas = [puntajeAtencion, puntajeComida, puntajeDemora].filter(
      (p) => typeof p === 'number'
    );

    const promedio =
      puntuacionesRespondidas.length > 0
        ? Number(
            (
              puntuacionesRespondidas.reduce((acc, curr) => acc + curr, 0) /
              puntuacionesRespondidas.length
            ).toFixed(2)
          )
        : '';

    const sanitizedMensaje = mensaje.trim().slice(0, 1000);
    const sanitizedMesa = OPCIONES_UBICACION.includes(mesa) ? mesa : '';

    const payload = {
      mesa: sanitizedMesa,
      atencion: puntajeAtencion,
      comida: puntajeComida,
      demora: puntajeDemora,
      promedio,
      mensaje: sanitizedMensaje,
      hora,
      fecha,
      fechaHora,
      timestamp: fechaHora,
    };

    try {
      await fetch(FEEDBACK_API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      setEnviado(true);
    } catch {
      setErrorEnvio('Hubo un problema al enviar tu opinión. Por favor, revisá tu conexión e intentá de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink text-stone-100 font-sans flex flex-col justify-between overflow-x-hidden selection:bg-filipo-accent selection:text-white">
      <div className="w-full flex-1 flex items-center justify-center px-4 py-6 sm:p-6 md:py-10">
        <main className="w-full max-w-md mx-auto">
          {enviado ? (
            <section
              aria-labelledby="success-heading"
              className="bg-graphite rounded-3xl p-6 sm:p-10 shadow-2xl border border-smoke text-center space-y-6 animate-fade-in"
            >
              <div className="flex justify-center">
                <img
                  src={logo}
                  alt="Filipo Café Resto Bar"
                  width="132"
                  height="48"
                  className="h-12 w-auto object-contain opacity-90 mx-auto"
                />
              </div>

              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-filipo-accent/15 text-filipo-accent mx-auto border border-filipo-accent/30 shadow-inner"
                aria-hidden="true"
              >
                <CheckCircle2 className="w-10 h-10" strokeWidth={2.5} />
              </div>

              <div className="space-y-3">
                <h1 id="success-heading" className="text-2xl font-bold text-white tracking-tight">
                  ¡Gracias por tu tiempo!
                </h1>
                <p className="text-filipo-secondary/90 leading-relaxed text-sm sm:text-base font-normal">
                  Leemos cada opinión para cuidar cada detalle de la casa. ¡Que disfrutes tu día!
                </p>
              </div>

              <div className="pt-4 border-t border-smoke/60 space-y-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-semibold bg-smoke/50 hover:bg-smoke text-stone-200 hover:text-white border border-smoke transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filipo-accent active:scale-[0.98]"
                >
                  <RotateCcw className="w-4 h-4 text-filipo-secondary" aria-hidden="true" />
                  <span>Dejar otra opinión</span>
                </button>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar a Filipo por WhatsApp (abre en una nueva pestaña)"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl text-sm font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-all duration-200 shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] active:scale-[0.98]"
                >
                  <svg
                    className="w-5 h-5 fill-current transition-transform duration-200 group-hover:scale-110 shrink-0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>¿Necesitás comunicarte con nosotros?</span>
                </a>
              </div>
            </section>
          ) : (
            <div className="bg-graphite rounded-3xl p-6 sm:p-8 shadow-2xl border border-smoke space-y-7">
              <header className="text-center space-y-4">
                <div className="flex justify-center pt-1">
                  <img
                    src={logo}
                    alt="Filipo Café Resto Bar"
                    width="220"
                    height="80"
                    fetchPriority="high"
                    className="h-16 sm:h-20 w-auto object-contain drop-shadow-md mx-auto"
                  />
                </div>
                <div className="space-y-1.5">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug flex items-center justify-center gap-2">
                    <span>¡Hola! Gracias por venir a Filipo</span>
                    <Coffee className="w-5 h-5 text-filipo-accent shrink-0" aria-hidden="true" />
                  </h1>
                  <p className="text-sm text-filipo-secondary/85 font-normal leading-relaxed px-2">
                    Contanos cortito cómo la pasaste para que te atendamos cada vez mejor. Podés responder solo lo que quieras o dejarnos un mensaje.
                  </p>
                </div>
              </header>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <fieldset className="space-y-2.5">
                  <legend className="block text-sm font-semibold text-stone-200">
                    ¿Dónde te ubicaste?
                  </legend>
                  <div className="grid grid-cols-3 gap-2" role="group" aria-label="Ubicación en el local">
                    {OPCIONES_UBICACION.map((opcion) => {
                      const isSelected = mesa === opcion;
                      return (
                        <button
                          key={opcion}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setMesa(mesa === opcion ? '' : opcion)}
                          className={`text-xs sm:text-sm py-2.5 px-3 rounded-xl font-medium transition-all duration-200 cursor-pointer border text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filipo-accent active:scale-[0.98] ${
                            isSelected
                              ? 'bg-filipo-accent text-white border-filipo-accent shadow-md shadow-filipo-accent/25 scale-[1.02]'
                              : 'bg-ink/80 text-stone-300 border-smoke hover:border-filipo-secondary/60 hover:bg-smoke/50'
                          }`}
                        >
                          {opcion}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="space-y-2.5">
                  <legend className="block text-sm font-semibold text-stone-200">
                    ¿Cómo te atendieron hoy?
                  </legend>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Calificación de atención">
                    {OPCIONES_ATENCION.map((opcion) => {
                      const isSelected = atencion === opcion;
                      return (
                        <button
                          key={opcion}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setAtencion(atencion === opcion ? '' : opcion)}
                          className={`text-xs sm:text-sm py-2 px-3.5 rounded-full font-medium transition-all duration-200 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filipo-accent active:scale-[0.98] ${
                            isSelected
                              ? 'bg-filipo-accent text-white border-filipo-accent shadow-md shadow-filipo-accent/25 scale-[1.02]'
                              : 'bg-ink/80 text-stone-300 border-smoke hover:border-filipo-secondary/60 hover:bg-smoke/50'
                          }`}
                        >
                          {opcion}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="space-y-2.5">
                  <legend className="block text-sm font-semibold text-stone-200">
                    ¿Qué tal estuvo lo que pediste?
                  </legend>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Calificación de comida">
                    {OPCIONES_COMIDA.map((opcion) => {
                      const isSelected = comida === opcion;
                      return (
                        <button
                          key={opcion}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setComida(comida === opcion ? '' : opcion)}
                          className={`text-xs sm:text-sm py-2 px-3.5 rounded-full font-medium transition-all duration-200 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filipo-accent active:scale-[0.98] ${
                            isSelected
                              ? 'bg-filipo-accent text-white border-filipo-accent shadow-md shadow-filipo-accent/25 scale-[1.02]'
                              : 'bg-ink/80 text-stone-300 border-smoke hover:border-filipo-secondary/60 hover:bg-smoke/50'
                          }`}
                        >
                          {opcion}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="space-y-2.5">
                  <legend className="block text-sm font-semibold text-stone-200">
                    ¿Cómo vino el tiempo de espera?
                  </legend>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Tiempo de espera">
                    {OPCIONES_DEMORA.map((opcion) => {
                      const isSelected = demora === opcion;
                      return (
                        <button
                          key={opcion}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setDemora(demora === opcion ? '' : opcion)}
                          className={`text-xs sm:text-sm py-2 px-3.5 rounded-full font-medium transition-all duration-200 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filipo-accent active:scale-[0.98] ${
                            isSelected
                              ? 'bg-filipo-accent text-white border-filipo-accent shadow-md shadow-filipo-accent/25 scale-[1.02]'
                              : 'bg-ink/80 text-stone-300 border-smoke hover:border-filipo-secondary/60 hover:bg-smoke/50'
                          }`}
                        >
                          {opcion}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="space-y-2">
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-semibold text-stone-200"
                  >
                    ¿Qué más te gustaría ver en Filipo?
                  </label>
                  <textarea
                    id="mensaje"
                    rows={3}
                    maxLength={1000}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribí acá lo que quieras (si faltó algo, una felicitación al mozo, etc.)..."
                    className="w-full bg-ink border border-smoke rounded-xl p-3 text-white placeholder:text-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-filipo-accent focus:border-filipo-accent transition-all duration-200 resize-none"
                  />
                </div>

                {errorEnvio && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-3.5 bg-red-950/50 border border-red-800/70 rounded-xl text-xs sm:text-sm text-red-200 flex items-start gap-2"
                  >
                    <span className="font-semibold shrink-0">Aviso:</span>
                    <span>{errorEnvio}</span>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={enviando}
                    className="bg-filipo-accent hover:opacity-90 active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-xl w-full transition-all duration-200 shadow-md shadow-filipo-accent/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-filipo-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    {enviando ? (
                      <>
                        <span
                          className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
                          aria-hidden="true"
                        />
                        <span>Guardando...</span>
                      </>
                    ) : (
                      <>
                        <span>Mandar mi opinión</span>
                        <Send className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-filipo-secondary/60 mt-2.5">
                    Podés enviar tu opinión en cualquier momento, aunque no completes todas las preguntas.
                  </p>
                </div>

                <div className="pt-3 border-t border-smoke/60 text-center">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contactar a Filipo por WhatsApp (abre en una nueva pestaña)"
                    className="inline-flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl text-sm font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-all duration-200 shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] active:scale-[0.98]"
                  >
                    <svg
                      className="w-5 h-5 fill-current transition-transform duration-200 group-hover:scale-110 shrink-0"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>¿Necesitás comunicarte con nosotros?</span>
                  </a>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      <footer className="bg-coal border-t border-smoke/50 py-3.5 px-4 text-center text-xs text-stone-400 flex items-center justify-center gap-2">
        <img
          src={logo}
          alt="Filipo"
          width="44"
          height="16"
          loading="lazy"
          className="h-4 w-auto opacity-70"
        />
        <span className="text-stone-500" aria-hidden="true">·</span>
        <Heart className="w-3 h-3 text-filipo-accent fill-filipo-accent inline" aria-hidden="true" />
        <span className="text-stone-500" aria-hidden="true">·</span>
        <span>Cuidando cada momento</span>
      </footer>
    </div>
  );
}
