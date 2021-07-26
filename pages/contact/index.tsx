function Contact() {
  return (
    <>
      <div className="px-4 mb-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <h1 className="px-4 text-3xl font-bold hover:text-gray-700">
          Me contacter
        </h1>
      </div>

      <section>
        <div>
          Si tu souhaites me contacter, tu as plusieurs possibilités :
          <ul className="list-disc mt-8 ml-8">
            <li>
              <a
                href="https://twitter.com/bobo_dev"
                className="font-black hover:text-gray-800"
              >
                Twitter (bobo_dev)
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/boris-cerati"
                className="font-black hover:text-gray-800"
              >
                LinkedIn (boris-cerati)
              </a>
            </li>

            <li>
              <strong>Email</strong> :
              <ul className="list-decimal ml-5">
                <li>
                  tu prends le mot <i className="italic underline">contact</i> ;
                </li>

                <li>
                  tu rajoutes un <i className="italic underline">@</i> ;
                </li>

                <li>
                  tu rajoutes mon <i className="italic underline">prénom</i> ;
                </li>
                <li>
                  tu rajoutes <i className="italic underline">un tiret du 6</i>{' '}
                  (comme dirait ma mère) ;
                </li>
                <li>
                  tu rajoutes mon <i className="italic underline">nom</i> ;
                </li>
                <li>
                  tu termines tout ça par{' '}
                  <i className="italic underline">.fr</i>. Ça y est, tu as
                  trouvé mon adresse email ultra-secrète.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Contact;
