import {createStandaloneToast} from '@chakra-ui/react';

const toast = createStandaloneToast();

const successToast = (title: string, description: string) => {
  if (!toast.isActive('success')) {
    toast({
      id: 'success',
      title,
      description,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  }
};

const errorToast = (title: string, description: string) => {
  if (!toast.isActive('error')) {
    toast({
      id: 'error',
      title,
      description,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
};

const warnToast = (title: string, description: string) => {
  if (!toast.isActive('warning')) {
    toast({
      id: 'warning',
      title,
      description,
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
  }
};

const infoToast = (title: string, description: string) => {
  if (!toast.isActive('info')) {
    toast({
      id: 'info',
      title,
      description,
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  }
};

export {successToast, errorToast, warnToast, infoToast};
