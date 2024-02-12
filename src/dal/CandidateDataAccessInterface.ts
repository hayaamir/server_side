// export interface DataAccessInterface<T> {
//     add(t: T): Promise<void>,
//     delete(id: number): Promise<void>,
//     update(id: number, updateData: Partial<T>): Promise<void>,
//     getOne(id: number): Promise<T>,
//     getCandidates(from?: number, to?: number, filterText?: string): Promise<T[]>;
// }

export interface DataAccessInterface<T> {
    add(t: T): Promise<void>;
    delete(id: number): Promise<void>;
    update(id: number, updateData: Partial<T>): Promise<void>;
    getOne(id: number): Promise<T>;
    getCandidates(page: number, size: number, filterText?: string): Promise<{
        candidates: T[];
        totalPages: number;
    }>;
}


