import { getBirthdaysOfMonth } from "@/api/endpoints";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import * as icon from "react-flaticons";

import { useCallback, useEffect, useState } from "react";
import {
  getMonthNameFromNumber,
  getMonthNumberFromName,
  MONTH_NAMES,
} from "../enum";

import { ModalConsultaAssistido } from "@/components/modal/modalConsultaAssistido";
import {
  useModalConsultaAssistido,
  useModalConsultaAssistidoContext as useModalContext,
} from "@/hooks/useModalConsultaAssistido";

const ITEMS_PER_PAGE = 10;

export const BirthdaysOfMonth = () => {
  const [birthdaysData, setBirthdaysData] = useState<any[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const modal = useModalConsultaAssistido();

  const handleAssistidoSelect = useCallback((id: string) => {
    modal.setIsOpen(true);
    modal.setId(id);
  }, []);

  const fetchData = () => {
    getBirthdaysOfMonth(selectedMonth).then((data) => {
      setBirthdaysData(data);
    });
  };

  const isEmpty = birthdaysData && !birthdaysData.length;

  const pagination = {
    totalItems: birthdaysData?.length ?? 0,
    itemsPerPage: ITEMS_PER_PAGE,
    totalPages: Math.ceil((birthdaysData?.length ?? 0) / ITEMS_PER_PAGE),
  };

  const startIndex = (currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;

  const currentItems = birthdaysData?.slice(startIndex, endIndex);

  const hasNextPage = currentPage < pagination.totalPages;
  const hasPreviousPage = currentPage > 1;

  const hasNextPages = (page: number) => page < pagination.totalPages;
  const hasPreviousPages = (page: number) => page > 1;

  useEffect(() => {
    fetchData();
    setCurrentPage(1);
  }, [selectedMonth]);

  const handleNextPage = () => {
    if (currentPage >= pagination.totalPages) return;
    setCurrentPage((page) => page + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage((page) => page - 1);
  };

  return (
    <div className="my-12 px-4">
      <Table className="max-w-full m-auto" noRounded={!!isEmpty}>
        <TableCaption className="font-semibold text-lg text-[#666666] mb-3">
          <div className="flex justify-start">
            <div className="flex justify-center items-center gap-2 flex-1">
              <p className="whitespace-nowrap">Aniversariantes do mês de</p>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="flex items-center justify-center gap-1 px-1 outline outline-1 rounded-md mr-1">
                    <span>{getMonthNameFromNumber(selectedMonth)}</span>
                    <icon.AngleSmallDown />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Selecione o mês</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Object.values(MONTH_NAMES).map((month) => (
                    <DropdownMenuItem
                      key={month}
                      onClick={() =>
                        setSelectedMonth(getMonthNumberFromName(month)!)
                      }
                    >
                      {month}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="translate-y-3 mr-2">Total: {pagination.totalItems}</p>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow className="!rounded-t-lg">
            <TableHead className="!rounded-tl-lg">Nome</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead className="!rounded-tr-lg">Data de nascimento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems?.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => handleAssistidoSelect(item.id)}
              className="cursor-pointer"
            >
              <TableCell className="!font-medium !capitalize">
                {item.nome}
              </TableCell>
              <TableCell>{item.idade}</TableCell>
              <TableCell>{item.data_nascimento}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isEmpty && (
        <div className="py-6 bg-white max-w-full h-full rounded-b-lg">
          <p className="p-2">Nenhum aniversariante encontrado para este mês.</p>
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

      {modal && modal.isOpen && modal.id && (
        <useModalContext.Provider value={modal}>
          <ModalConsultaAssistido />
        </useModalContext.Provider>
      )}
    </div>
  );
};
