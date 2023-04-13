export interface CreateBambooPort {
  create(content: string, password: string): number | Promise<number>;
}
