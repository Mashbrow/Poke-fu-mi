
const getWeakness = (type: string) => {
  switch (type) {
      case "Feu":
          return "Eau"
      case "Eau":
          return "Elec"
      case "Elec":
          return "Roche"
      case "Roche":
          return "Plante"
      case "Plante":
          return "Feu"
  }
}

export {getWeakness}
