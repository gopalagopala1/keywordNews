import { FetchNewsPayload } from "@/types/news";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
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
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent h="70%">
        <ModalHeader fontSize="2rem" borderBottom="1px" borderColor="purple">
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
                  />
                  <Text fontSize="0.7rem" fontStyle="italic" color="grey">
                    Search for news without space or comma separated keywords
                  </Text>
                </InputGroup>
              </Flex>

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
