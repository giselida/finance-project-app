declare global {
  interface Number {
    /**
     * Extensão do protótipo de Number que formata um número para o formato de moeda brasileira (BRL).
     *
     * @method
     * @name Number#formatToBRL
     *
     * @returns {string} A string representando o número no formato de moeda brasileira (R$).
     *
     * @example
     * const valor = 1234.56;
     * console.log(valor.formatToBRL()); // "R$ 1.234,56"
     *
     * // Com números inteiros
     * const valorInteiro = 5000;
     * console.log(valorInteiro.formatToBRL()); // "R$ 5.000,00"
     */
    formatToBRL: () => string;
  }
  interface String {
    /**
     * Converte uma string no formato "dd/mm/yyyy" para um objeto Date correspondente.
     *
     * @method
     * @name String#convertStringDate
     *
     * @returns {Date | null} Um objeto Date correspondente ou `null` se a string de data for inválida.
     *
     * @example
     * const data = "25/12/2023";
     * const dataConvertida = data.convertStringDate();
     * console.log(dataConvertida); // Date object: Mon Dec 25 2023
     */
    convertStringDate(): Date | null;
  }
}

export {};
