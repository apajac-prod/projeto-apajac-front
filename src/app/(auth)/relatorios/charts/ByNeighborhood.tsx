import { getByNeighborhood } from "@/api/endpoints";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

const ITEMS_PER_PAGE = 10;

export const ByNeighborhood = () => {
  const [neighborhoodData, setNeighborhoodData] = useState<any[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [neighborhoodSearch, setNeighborhoodSearch] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  const fetchData = () => {
    getByNeighborhood(neighborhoodSearch).then((data) => {
      setNeighborhoodData(data);
    });
  };

  const isEmpty = neighborhoodData && !neighborhoodData.length;

  const pagination = {
    totalItems: neighborhoodData?.length ?? 0,
    itemsPerPage: ITEMS_PER_PAGE,
    totalPages: Math.ceil((neighborhoodData?.length ?? 0) / ITEMS_PER_PAGE),
  };

  const startIndex = (currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;

  const currentItems = neighborhoodData?.slice(startIndex, endIndex);

  const hasNextPage = currentPage < pagination.totalPages;
  const hasPreviousPage = currentPage > 1;

  const hasNextPages = (page: number) => page < pagination.totalPages;
  const hasPreviousPages = (page: number) => page > 1;

  useEffect(() => {
    fetchData();
    setCurrentPage(1);
  }, [neighborhoodSearch]);

  const handleNextPage = () => {
    if (currentPage >= pagination.totalPages) return;
    setCurrentPage((page) => page + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage((page) => page - 1);
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setNeighborhoodSearch(value);
    }, 800),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="my-12 px-4">
      <Table className="max-w-full m-auto" noRounded={!!isEmpty}>
        <TableCaption className="font-semibold text-lg text-[#666666] mb-3">
          <div className="flex">
            <div className="flex justify-start items-center gap-2 flex-1">
              <p className="whitespace-nowrap">Busque por bairro</p>
              <input
                type="text"
                className="text-black"
                value={searchInputValue}
                onChange={handleSearchChange}
              />
            </div>
            <p className="translate-y-4 mr-2">Total: {pagination.totalItems}</p>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow className="!rounded-t-lg">
            <TableHead className="!rounded-tl-lg">Bairro</TableHead>
            <TableHead>Média de idade (anos)</TableHead>
            <TableHead className="!rounded-tr-lg">
              Total assistidos neste bairro
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems?.map((item) => (
            <TableRow
              key={item.bairro + item.total_assistidos + item.media_idade}
            >
              <TableCell className="!font-medium !capitalize">
                {item.bairro}
              </TableCell>
              <TableCell>{item.media_idade}</TableCell>
              <TableCell>{item.total_assistidos}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isEmpty && (
        <div className="py-6 bg-white max-w-full h-full rounded-b-lg">
          {neighborhoodSearch ? (
            <p className="p-2">
              Nenhum bairro encontrado. Altere o campo de busca para obter
              resultados.
            </p>
          ) : (
            <p className="p-2">Nenhum bairro encontrado.</p>
          )}
        </div>
      )}
      {pagination?.totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePreviousPage}
                className={`cursor-pointer ${!hasPreviousPage && "invisible"}`}
              />
            </PaginationItem>
            {hasPreviousPages(currentPage - 1) && (
              <>
                <PaginationItem>
                  <PaginationLink
                    className="hover:outline hover:outline-2 hover:outline-sky-800 cursor-pointer"
                    onClick={() => setCurrentPage(1)}
                  >
                    {1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}
            {hasPreviousPage && (
              <PaginationItem>
                <PaginationLink
                  className="hover:outline hover:outline-2 hover:outline-sky-800 cursor-pointer"
                  onClick={() => setCurrentPage((page) => page - 1)}
                >
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink className="outline outline-2 outline-sky-800 cursor-pointer">
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {hasNextPage && (
              <PaginationItem>
                <PaginationLink
                  className="hover:outline hover:outline-2 hover:outline-sky-800 cursor-pointer"
                  onClick={() => setCurrentPage((page) => page + 1)}
                >
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            {hasNextPages(currentPage + 1) && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className="hover:outline hover:outline-2 hover:outline-sky-800 cursor-pointer"
                    onClick={() => setCurrentPage(pagination.totalPages)}
                  >
                    {pagination.totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                className={`cursor-pointer ${!hasNextPage && "invisible"}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
