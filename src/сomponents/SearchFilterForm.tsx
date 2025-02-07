import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setFilter } from '@/store/formSlice';
import { RootState } from '@/store/store';

interface Filter {
  name: string;
  value: string;
}

interface SearchFilterFormProps {
  onSearchSubmit: (search: string) => void;
  onFilterChange: (filterName: string, value: string) => void;
  initialSearchValue?: string;
  filters: Filter[];
  filterOptions: Record<string, string[]>;
}

type FilterNames = 'search' | keyof RootState['form']['filters'];

const SearchFilterForm: React.FC<SearchFilterFormProps> = ({
  onSearchSubmit,
  onFilterChange,
  initialSearchValue = '',
  filters,
  filterOptions,
}) => {
  const dispatch = useDispatch();
  const { search, filters: storedFilters, error } = useSelector((state: RootState) => state.form);

  // Define the zod validation schema
  const schema = z.object({
    search: z
      .string()
      .min(1, "Search field cannot be empty")
      .max(100, "Search query is too long")
      .regex(/^[a-zA-Z0-9\s-]*$/, "Only Latin letters, numbers, spaces, and dashes are allowed"),
  });

  // Define the resolver using zod
  const resolver: Resolver<{ search: string }, Record<string, { message: string; type: string }>> = async (data) => {
    try {
      schema.parse(data);
      return { values: data, errors: {} };
    } catch (err) {
      if (err instanceof z.ZodError) {
        return {
          values: {},
          errors: err.errors.reduce((acc: Record<string, { message: string; type: string }>, e) => {
            acc[e.path[0]] = { message: e.message, type: e.code };
            return acc;
          }, {}),
        };
      }
      throw err;
    }
  };

  const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm({
    defaultValues: { search: initialSearchValue || search },
    resolver,
  });

  useEffect(() => {
    setValue('search', search);
    filters.forEach((filter) => {
      if (filter.name === 'search' && storedFilters[filter.name as FilterNames]) {
        setValue(filter.name, storedFilters[filter.name]);
      }
    });
  }, [search, storedFilters, setValue, filters]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;

    dispatch(setSearch(newSearch));
    onSearchSubmit(newSearch);

    if (newSearch.length > 0) {
      clearErrors('search');
    }
  };

  const handleFilterChange = (filterName: string, value: string) => {
    dispatch(setFilter({ name: filterName, value }));
    onFilterChange(filterName, value);
  };

  const onSubmit: SubmitHandler<{ search: string }> = (data) => {
    onSearchSubmit(data.search);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-4 justify-center md:flex-row md:items-center">
      <input
        type="text"
        placeholder="Search..."
        {...register('search')}
        onChange={handleSearchChange}
        className="w-full md:w-auto px-4 py-2 border rounded-md text-gray-900"
      />
      {errors.search && <p className="text-red-500">{errors.search.message}</p>}

      {filters.map((filter) => (
        <select
          key={filter.name}
          value={storedFilters[filter.name] || filter.value}
          onChange={(e) => handleFilterChange(filter.name, e.target.value)}
          className="w-full md:w-auto px-4 py-2 border rounded-md text-gray-900"
        >
          <option value="">Select {filter.name}</option>
          {filterOptions[filter.name]?.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ))}

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default SearchFilterForm;