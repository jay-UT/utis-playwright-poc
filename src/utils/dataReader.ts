import * as fs from 'fs';
import * as path from 'path';

/**
 * Reads JSON test data from /test-data.
 * Usage: const users = DataReader.get('testData').users;
 */
export class DataReader {
  static get<T = any>(fileName: string): T {
    const filePath = path.resolve(process.cwd(), 'test-data', `${fileName}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
  }
}
