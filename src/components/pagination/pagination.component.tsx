import React, { useMemo, useCallback, FC } from "react";
import { 
  Pane, 
  useTheme, 
  majorScale,
  minorScale,
  Text, 
  Button,
  IconButton,
  ChevronLeftIcon,
  ChevronRightIcon,
  ButtonOwnProps,
} from "evergreen-ui";

type PaginationButtonProps = ButtonOwnProps & {
  isSelected: boolean;
  onPageChange: (page: number) => void;
  page: number;
  children: React.ReactNode;
}

type PaginationProps = {
  onNextPage: () => void;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  totalPages: number;
  page: number;
}

const range = (start: number, stop: number) => {
  const output = []
  for (let i = start; i <= stop; i++) {
    output.push(i)
  }

  return output
}

const PaginationButton: FC<PaginationButtonProps> = ({ isSelected, onPageChange, page, ...rest }) => {
  const { colors } = useTheme()
  const isEllipsis = typeof page === "string" && page === "..."
  const selectedProps = useMemo(() => {
    if (isSelected) {
      return {
        backgroundColor: colors.blue50,
        color: colors.blue400
      }
    } else {
      return {}
    }
  }, [isSelected, colors])

  const onClick = useCallback(() => {
    onPageChange(page)
  }, [page, onPageChange])

  if (isEllipsis) {
    return (
      <Text
        paddingX={majorScale(1)}
        paddingY={majorScale(1)}
        minWidth={majorScale(4)}
        textAlign="center"
        aria-label="Pagination overflow"
      >
        {page}
      </Text>
    )
  }

  return (
    <Button
      aria-current={isSelected}
      aria-label={`Page ${page}`}
      onClick={onClick}
      minWidth={majorScale(4)}
      paddingX={majorScale(1)}
      {...selectedProps}
      {...rest}
    />
  )
}
const Pagination: FC<PaginationProps> = ({ onNextPage, onPageChange, onPreviousPage, page = 1, totalPages }) => {
  const pages = range(1, totalPages);
  return (
    <Pane is="nav">
      <Pane is="ul" height={50} display="flex" alignItems="center" padding={0} margin={0}>
        <Pane is="li" listStyle="none" padding={0}>
          <IconButton appearance="minimal" icon={ChevronLeftIcon} disabled={page === 1} onClick={onPreviousPage} />
        </Pane>
        {
          pages.map((val, idx) => { 
            const isSelected = val === page; 
            return (
              <Pane is="li" listStyle="none" key={`${page}-${idx}`}>
                <PaginationButton
                  appearance="minimal"
                  isSelected={isSelected}
                  page={val}
                  onPageChange={onPageChange}
                >
                  { val }
                </PaginationButton>
              </Pane>
            ) 
          })
        }
        <Pane is="li" listStyle="none" padding={0}>
          <IconButton
            appearance="minimal"
            icon={ChevronRightIcon}
            disabled={totalPages ? page === totalPages : undefined}
            onClick={onNextPage}
          />
        </Pane>
      </Pane>
    </Pane>
  )
}

export default Pagination;
