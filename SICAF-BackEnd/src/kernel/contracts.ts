export interface UseCase<Tinput, Toutput> {
    execute(input: Tinput): Promise<Toutput>;
}