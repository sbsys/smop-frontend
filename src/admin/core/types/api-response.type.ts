export interface ApiResponse<D = any> {
    message: string;
    error: boolean;
    data: D;
}
