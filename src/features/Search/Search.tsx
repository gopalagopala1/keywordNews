import {
  Button,
  Flex,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type SearchType = {
  isOpen: boolean;
  onClose: () => void;
};

const Search = ({ isOpen, onClose }: SearchType) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalBody padding="2rem">
          <Flex direction="column" gap="1rem" width="full" bg="white">
            <InputGroup flexDirection="column">
              <Text fontSize="0.8rem" mb="0.5rem" fontWeight="600">
                Include Keywords
              </Text>
              <Input />
              <Text fontSize="0.5rem" fontStyle="italic" color="grey">
                Search for news with space or comma separated keywords
              </Text>
            </InputGroup>

            <InputGroup flexDirection="column">
              <Text fontSize="0.8rem" mb="0.5rem" fontWeight="600">
                Exclude Keywords
              </Text>
              <Input />
              <Text fontSize="0.5rem" fontStyle="italic" color="grey">
                Search for news without  space or comma separated keywords
              </Text>
            </InputGroup>

            <Button bg="purple" textColor="white">
              Search
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Search;
