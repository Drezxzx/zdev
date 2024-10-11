const { uniqueNamesGenerator, adjectives, animals } = require('unique-names-generator');

function generarNombreUsuario() {
  const nombreUsuario = uniqueNamesGenerator({
    dictionaries: [adjectives, animals], 
    separator: '_',
    length: 2,
    style: 'lowerCase',
  });
  return nombreUsuario;
}

console.log(generarNombreUsuario());
