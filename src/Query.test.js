import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";

test("useIasQuery", async () => {
    function useCustomHook() {
        return useQuery(['customHook'], () => 'Hello');
    }
    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

    const { result, waitFor } = renderHook(() => useCustomHook(), { wrapper });

    await waitFor(() => result.current.isSuccess, {interval: 100});
    expect(result.current.data).toEqual("Hello");
});