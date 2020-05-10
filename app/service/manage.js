const Service = require("egg").Service;

class ManageService extends Service {
  async uploadFile() {
    console.log(this.ctx)
  }
}

module.exports = ManageService;