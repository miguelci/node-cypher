import neo4j from 'neo4j-driver';

const dbHost = 'bolt://db:7687';

class ConnectionDriver {
  static driver: typeof neo4j.Driver | null = null;

  static getConnection(): typeof neo4j.Driver {
    if (this.driver === null) {
      this.driver = neo4j.driver(dbHost);
    }

    return this.driver;
  }

  static async close() {
    if (this.driver === null) {
      return;
    }

    await this.driver.close();
    this.driver = null;
  }
}

export default ConnectionDriver;
