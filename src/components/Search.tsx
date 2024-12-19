import { FetchNewsPayload } from "@/types/news";
import {
  categoriesArray,
  countryCodes,
  languageCodesArray,
} from "@/utils/constants";
import {
  Button,
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent h="70%" color="purple.700">
        <ModalHeader
          fontSize="2rem"
          borderBottom="1px"
          borderColor="purple.700"
        >
          Search
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="2rem">
          <form onSubmit={handleFormSubmit} style={{ height: "100%" }}>
            <Flex
              direction="column"
              justifyContent="space-between"
              height="full"
            >
              <Flex direction="column" gap="1rem">
                <Flex gap="1rem" fontSize="1rem">
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
                    <Text fontSize="0.7rem" fontStyle="italic" color="grey">
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
                    <Text fontSize="0.7rem" fontStyle="italic" color="grey">
                      Search for news without space or comma separated keywords
                    </Text>
                  </InputGroup>
                </Flex>

                <Flex gap="1rem" fontSize="1rem">
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
                </Flex>
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

              <Flex gap="1rem" mt="1rem">
                <Button
                  bg="purple.700"
                  textColor="white"
                  type="submit"
                  flex="1"
                  _hover={{
                    textColor: "purple.700",
                    backgroundColor: "white",
                    border: "1px",
                    borderColor: "purple.700",
                  }}
                >
                  Search
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClear}
                  flex="1"
                  color="purple.700"
                  border="1px"
                  borderColor="purple.700"
                  _hover={{
                    backgroundColor: "purple.700",
                    color: "white",
                    border: "none",
                  }}
                >
                  Clear
                </Button>
              </Flex>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Search;
