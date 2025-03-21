import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import Spinner from "../../app/layout/Spinner";
import { Box, FormControl, FormControlLabel, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Brand } from "../../app/models/brand";
import { Type } from "../../app/models/type";

const sortOption = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" }
];

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("asc");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedBrandId, setSelectedBrandId] = useState<number>(0);
  const [selectedTypeId, setSelectedTypeId] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  // Fetching data
  useEffect(() => {
    setLoading(true);
    Promise.all([
      agent.Store.list(currentPage, pageSize),
      agent.Store.brands(),
      agent.Store.types()
    ])
      .then(([productsRes, brandsResp, typesResp]) => {
        setProducts(productsRes.content);
        setBrands(brandsResp);
        setTypes(typesResp);
        setTotalItems(productsRes.totalElements);  // Assuming totalElements is returned from API
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [currentPage, pageSize]);

  const loadProducts = (selectedSort: string, searchKeywords: string = "") => {
    setLoading(true);
    let page = currentPage - 1;
    let size = pageSize;
    let brandId = selectedBrandId !== 0 ? selectedBrandId : undefined;
    let typeId = selectedTypeId !== 0 ? selectedTypeId : undefined;
    const sort = "name";
    const order = selectedSort === "desc" ? "desc" : "asc";

    // Construct the URL
    let url = `${agent.Store.apiUrl}?Sort=${sort}&order=${order}`;

    if (brandId !== undefined || typeId !== undefined) {
      url += "&";
      if (brandId !== undefined) url += `brandId=${brandId}&`;
      if (typeId !== undefined) url += `typeId=${typeId}&`;
      url = url.replace(/&$/, "");
    }

    if (searchKeywords) {
      agent.Store.search(searchKeywords)
        .then((productRes) => {
          setProducts(productRes.content);
          setTotalItems(productRes.length);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } else {
      agent.Store.list(page, size, undefined, undefined, url)
        .then((productRes) => {
          setProducts(productRes.content);
          setTotalItems(productRes.length);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    loadProducts(selectedSort);
  }, [selectedBrandId, selectedTypeId, selectedSort, currentPage]); // Watch for changes in sorting, brand, type, and page

  const handleSortChange = (event: any) => {
    const selectedSort = event.target.value;
    setSelectedSort(selectedSort);
    loadProducts(selectedSort);
  };

  const handleBrandChange = (event: any) => {
    const selectedBrand = event.target.value;
    const brand = brands.find((b) => b.name === selectedBrand);

    setSelectedBrand(selectedBrand);
    if (brand) {
      setSelectedBrandId(brand.id);
      loadProducts(selectedSort);
    }
  };

  const handleTypeChange = (event: any) => {
    const selectedType = event.target.value;
    const type = types.find((b) => b.name === selectedType);
    setSelectedType(selectedType);
    if (type) {
      setSelectedTypeId(type.id);
      loadProducts(selectedSort);
    }
  };

  const handlePageChange = (event: any, page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <Spinner message="Loading Products..." />;
  if (products.length === 0) return <Typography variant="h6" color="textSecondary">No products available.</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box mb={2} textAlign="center">
          <Typography variant="subtitle1">
            Displaying {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
          </Typography>
        </Box>

        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(totalItems / pageSize)}
            color="primary"
            onChange={handlePageChange}
            page={currentPage}
          />
        </Box>
      </Grid>

      <Grid item xs={12} sm={4}> {/* Side filters */}
        <Paper sx={{ mb: 2 }}>
          <TextField
            label="Search Products"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loadProducts(selectedSort, searchTerm);
              }
            }}
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <FormLabel id="sort-by-name-label">Sort by Name</FormLabel>
            <RadioGroup
              aria-label="sort-by-name"
              name="sort-by-name"
              value={selectedSort}
              onChange={handleSortChange}
            >
              {sortOption.map(({ value, label }) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <FormLabel id="brands">Brands</FormLabel>
            <RadioGroup
              aria-label="brands"
              name="brands"
              value={selectedBrand}
              onChange={handleBrandChange}
            >
              {brands.map((brand) => (
                <FormControlLabel
                  key={brand.id}
                  value={brand.name}
                  control={<Radio />}
                  label={brand.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <FormLabel id="type-label">Types</FormLabel>
            <RadioGroup
              aria-label="types"
              name="types"
              value={selectedType}
              onChange={handleTypeChange}
            >
              {types.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.name}
                  control={<Radio />}
                  label={type.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={8}> {/* Product listing */}
        <ProductList products={products} />
      </Grid>

      <Grid item xs={12}>
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(totalItems / pageSize)}
            color="primary"
            onChange={handlePageChange}
            page={currentPage}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
