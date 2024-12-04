import {
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
        <Flex direction="column" gap="1rem" width="full" bg="white">
          <InputGroup flexDirection="column">
            <Text fontSize="1rem">Include Keywords:</Text>
            <Input />
            <Text fontSize="0.5rem" fontStyle="italic">
              Search for news with space or comma separated keywords
            </Text>
          </InputGroup>

          <InputGroup flexDirection="column">
            <Text>Exclude Keywords:</Text>
            <Input />
            <Text fontSize="0.5rem" fontStyle="italic">
              Search for news without space or comma separated keywords
            </Text>
          </InputGroup>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default Search;
