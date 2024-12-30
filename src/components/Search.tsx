import { FetchNewsPayload } from "@/types/news";
import {
  categoriesArray,
  countryCodes,
  languageCodesArray,
} from "@/utils/constants";
import newsUtils from "@/utils/utils";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  InputGroup,
  Select,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";

type SearchType = {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (payload: FetchNewsPayload) => void;
  onClear: () => void;
};

const Search = ({
  isOpen,
  onClose,
  onSearch,
  onClear,
}: SearchType) => {
  const [searchParams, setSearchParams] = useState({
    includeKeywords: "",
    excludeKeywords: "",
    country: "",
    category: "",
    language: "",
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formState = {
      includeKeywords: formData.get("includeKeywords") as string,
      excludeKeywords: formData.get("excludeKeywords") as string,
      country: formData.get("country") as string,
      category: formData.get("category") as string,
      language: formData.get("language") as string,
    };

    const payload: FetchNewsPayload = {
      includeKeywords: newsUtils.parseInput(
        (formData.get("includeKeywords") as string) || ""
      ),
      excludeKeywords: newsUtils.parseInput(
        (formData.get("excludeKeywords") as string) || ""
      ),
      country: formData.get("country") as string,
      category: formData.get("category") as string,
      language: formData.get("language") as string,
    };

    setSearchParams(formState);
    onSearch(payload);
    onClose();
  };

  const handleClear = () => {
    setSearchParams({
      includeKeywords: "",
      excludeKeywords: "",
      country: "",
      category: "",
      language: "",
    });

    onClear();
  };

  const mobileView = () => (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} >
      <DrawerOverlay width="full"/>
      <DrawerContent minW="full">
        <DrawerCloseButton  />
        <DrawerHeader
          fontSize="1.25rem"
          borderBottom="1px solid"
          borderColor="black"
          width="full"
        >
          Search
        </DrawerHeader>

        <form onSubmit={handleFormSubmit} style={{ height: "100%" }}>
          <DrawerBody py="1.5rem" width="full">
            <Flex
              direction="column"
              justifyContent="space-between"
              height="full"
            >
              <Flex direction="column" gap="1rem">
                <InputGroup flexDirection="column">
                  <Text mb="0.5rem" fontWeight="600">
                    Include Keywords
                  </Text>
                  <Input
                    value={searchParams.includeKeywords}
                    onChange={(e) => {
                      setSearchParams({
                        ...searchParams,
                        includeKeywords: e.target.value,
                      });
                    }}
                    placeholder="Enter keywords to include"
                    border="1px"
                    name="includeKeywords"
                  />
                  <Text fontSize="0.6rem" fontStyle="italic" color="grey">
                    Search for news with above keyword (space or comma
                    separated)
                  </Text>
                </InputGroup>

                <InputGroup flexDirection="column">
                  <Text mb="0.5rem" fontWeight="600">
                    Exclude Keywords
                  </Text>
                  <Input
                    value={searchParams.excludeKeywords}
                    onChange={(e) => {
                      setSearchParams({
                        ...searchParams,
                        excludeKeywords: e.target.value,
                      });
                    }}
                    placeholder="Enter keywords to exclude"
                    border="1px"
                    name="excludeKeywords"
                  />
                  <Text fontSize="0.6rem" fontStyle="italic" color="grey">
                    Search for news without keywords (space or comma separated)
                  </Text>
                </InputGroup>

                <InputGroup flexDirection="column">
                  <Text mb="0.5rem" fontWeight="600">
                    Country
                  </Text>
                  <Select
                    placeholder="-Select Country-"
                    border="1px"
                    name="country"
                    value={searchParams.country}
                    onChange={(e) => {
                      setSearchParams({
                        ...searchParams,
                        country: e.target.value,
                      });
                    }}
                  >
                    {countryCodes?.map((cc) => (
                      <option value={cc.value} key={cc.value}>
                        {cc.label}
                      </option>
                    ))}
                  </Select>
                </InputGroup>

                <InputGroup flexDirection="column">
                  <Text mb="0.5rem" fontWeight="600">
                    Category
                  </Text>
                  <Select
                    placeholder="-Select Category-"
                    border="1px"
                    name="category"
                    value={searchParams.category}
                    onChange={(e) => {
                      setSearchParams({
                        ...searchParams,
                        category: e.target.value,
                      });
                    }}
                  >
                    {categoriesArray?.map((cat) => (
                      <option value={cat.value} key={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </Select>
                </InputGroup>

                <InputGroup flexDirection="column">
                  <Text mb="0.5rem" fontWeight="600">
                    Language
                  </Text>
                  <Select
                    placeholder="-Select Language-"
                    border="1px"
                    name="language"
                    value={searchParams.language}
                    onChange={(e) => {
                      setSearchParams({
                        ...searchParams,
                        language: e.target.value,
                      });
                    }}
                  >
                    {languageCodesArray?.map((lang) => (
                      <option value={lang.value} key={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
              </Flex>
            </Flex>
          </DrawerBody>
          <DrawerFooter borderTop="1px solid" borderColor="black">
            <Flex gap="1rem" w="full">
              <Button
                bg="red.500"
                textColor="white"
                type="submit"
                flex="1"
                _hover={{
                  textColor: "white",
                  backgroundColor: "red.700",
                  border: "1px",
                  borderColor: "red.700",
                }}
              >
                Search
              </Button>
              <Button
                variant="outline"
                onClick={handleClear}
                flex="1"
                color="black"
                border="1px"
                borderColor="black"
                _hover={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                }}
              >
                Clear
              </Button>
            </Flex>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );

  return mobileView();
};

export default Search;
