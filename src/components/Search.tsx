import { FetchNewsPayload } from "@/types/news";
import {
  categoriesArray,
  countryCodes,
  languageCodesArray,
} from "@/utils/constants";
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";

type SearchType = {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (payload: FetchNewsPayload) => void;
  parseInput: (inputString: string) => string[];
  onClear: () => void;
};

const Search = ({
  isOpen,
  onClose,
  onSearch,
  parseInput,
  onClear,
}: SearchType) => {
  const [includeKeywords, setIncludeKeywords] = useState("");
  const [excludeKeywords, setExcludeKeywords] = useState("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload: FetchNewsPayload = {
      includeKeywords: parseInput(
        (formData.get("includeKeywords") as string) || ""
      ),
      excludeKeywords: parseInput(
        (formData.get("excludeKeywords") as string) || ""
      ),
      country: formData.get("country") as string,
      category: formData.get("category") as string,
      language: formData.get("language") as string,
    };

    onSearch(payload);
    onClose();
  };

  const handleClear = () => {
    setIncludeKeywords("");
    setExcludeKeywords("");
    onClear();
  };

  const mobileView = () => (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader
          fontSize="1.25rem"
          borderBottom="1px solid"
          borderColor="black"
        >
          Search
        </DrawerHeader>

        <form onSubmit={handleFormSubmit} style={{ height: "100%" }}>
          <DrawerBody py="1.5rem">
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
                    value={includeKeywords}
                    onChange={(e) => setIncludeKeywords(e.target.value)}
                    placeholder="Enter keywords to include"
                    border="1px"
                    name="includeKeywords"
                  />
                  <Text fontSize="0.6rem" fontStyle="italic" color="grey">
                    Search for news with space or comma separated keywords
                  </Text>
                </InputGroup>

                <InputGroup flexDirection="column">
                  <Text mb="0.5rem" fontWeight="600">
                    Exclude Keywords
                  </Text>
                  <Input
                    value={excludeKeywords}
                    onChange={(e) => setExcludeKeywords(e.target.value)}
                    placeholder="Enter keywords to exclude"
                    border="1px"
                    name="excludeKeywords"
                  />
                  <Text fontSize="0.6rem" fontStyle="italic" color="grey">
                    Search for news without space or comma separated keywords
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
            <Flex gap="1rem" mt="1rem" w="full">
              <Button
                bg="red.500"
                textColor="white"
                type="submit"
                flex="1"
                _hover={{
                  textColor: "red.700",
                  backgroundColor: "white",
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
