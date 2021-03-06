class Hydration {
  constructor(hydrationData, userNow, date, userRepo) {
    this.hydrationData = hydrationData;
    this.user = userNow;
    this.date = date;
    this.userRepo = userRepo;
  }
  calculateAverageOunces() {
    let perDayUserHydration = this.hydrationData.filter((data) => this.user.id === data.userID);

    const userHydration = perDayUserHydration.reduce((sum, data) => {
      return sum += data.numOunces;
    }, 0) / perDayUserHydration.length
    return Math.floor(userHydration);
  }
  calculateDailyOunces(day) {
    if (!day) {
      day = this.date
    }
    let findOuncesByDate = this.hydrationData.find(data => this.user.id === data.userID && day === data.date);
    return findOuncesByDate.numOunces;
  }
  calculateFirstWeekOunces() {
    return this.userRepo.getFirstWeek(this.user.id, this.hydrationData).map((data) => {
      return {[data.date]: data.numOunces};
    });
  }
 
  userDataForWeek(relevantData) {
    return this.userRepo.getWeekFromDate(this.date, this.user.id, this.hydrationData).map((data) => {
      return {x: data.date, y: data[relevantData]}
    });
  }

}


export default Hydration;
