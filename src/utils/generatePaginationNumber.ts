

export const generatePaginationNumber = (currentPage: number, totalPages: number) => {

  // si el numero total es 7 o menos  modatar ... 
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1) //[1,2,3,4,6,7]
  }
  // Si la pagina actual esta entre kas primeras 3 paginas se mjestras 3 primeras ... y las 2 ultimas

  if (currentPage < 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages] // [1,2,3,'...',49,50]
  }
  // si la pagina actual esta entre las 3 ultimas muestra 2 primeras ... y las 2 ultimas paginas
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages] // [1,2,'...',50,51,52]
  }
  //  si la pagina actual esta en otro lugar mostrar la primera pagina ... la pagina actual y vecinos
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages] // [1,2, '...',10,11,12,'...', 50

}