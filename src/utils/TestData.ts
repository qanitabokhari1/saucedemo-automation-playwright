export class TestData {
  static generateFirstName(): string {
    const firstNames = [
      'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa',
      'James', 'Maria', 'William', 'Jennifer', 'Richard', 'Patricia', 'Charles'
    ];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
  }

  static generateLastName(): string {
    const lastNames = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
      'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez'
    ];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  }

  static generateZipCode(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  static generateCustomerData(): {
    firstName: string;
    lastName: string;
    zipCode: string;
  } {
    return {
      firstName: this.generateFirstName(),
      lastName: this.generateLastName(),
      zipCode: this.generateZipCode()
    };
  }
}
