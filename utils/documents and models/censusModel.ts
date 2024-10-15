interface CensusInterface {
  name: string
  state: string
  city: string
}

class Census implements CensusInterface {
  name: string
  state: string
  city: string
  constructor(name: string, state: string, city: string) {
    this.name = name
    this.state= state
    this.city = city
  }
}