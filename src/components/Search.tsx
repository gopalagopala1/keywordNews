import { FetchNewsPayload } from "@/types/news";
import {
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
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

    const payload: FetchNewsPayload = {
      includeKeywords: parseInput(includeKeywords),
      excludeKeywords: parseInput(excludeKeywords),
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody padding="2rem">
          <form onSubmit={handleFormSubmit}>
            <Flex direction="column" gap="1rem" width="full" bg="white">
              <FormControl>
                <InputGroup flexDirection="column">
                  <Text fontSize="0.8rem" mb="0.5rem" fontWeight="600">
                    Include Keywords
                  </Text>
                  <Input
                    value={includeKeywords}
                    onChange={(e) => setIncludeKeywords(e.target.value)}
                    placeholder="Enter keywords to include"
                  />
                  <Text fontSize="0.5rem" fontStyle="italic" color="grey">
                    Search for news with space or comma separated keywords
                  </Text>
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup flexDirection="column">
                  <Text fontSize="0.8rem" mb="0.5rem" fontWeight="600">
                    Exclude Keywords
                  </Text>
                  <Input
                    value={excludeKeywords}
                    onChange={(e) => setExcludeKeywords(e.target.value)}
                    placeholder="Enter keywords to exclude"
                  />
                  <Text fontSize="0.5rem" fontStyle="italic" color="grey">
                    Search for news without space or comma separated keywords
                  </Text>
                </InputGroup>
              </FormControl>

              <Flex gap="1rem" mt="1rem">
                <Button bg="purple" textColor="white" type="submit" flex="1">
                  Search
                </Button>
                <Button variant="outline" onClick={handleClear} flex="1">
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
