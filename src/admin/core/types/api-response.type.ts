export interface ApiResponse<D = any> {
    message: string;
    error: boolean; // status
    data: D;
}
