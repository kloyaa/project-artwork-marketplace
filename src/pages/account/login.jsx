import React, { useState } from 'react';
import {
    Box,
    Text,
    Flex,
    Stack,
    Heading,
    Container,
    Input,
    Button,
    SimpleGrid,
    Avatar,
    AvatarGroup,
    useBreakpointValue,
    Tooltip,
    Alert,
    AlertIcon,
    AlertDescription,
    useDisclosure,
    ScaleFade,
    FormControl,
    useColorMode
} from '@chakra-ui/react';


import { useRecoilState, useRecoilValue } from 'recoil';
import { useForm } from "react-hook-form";
import { avatars } from '../../const/url';
import { Blur } from '../../const/components';
import { useNavigate } from "react-router-dom";
import { Authentication } from '../../controllers/authenticaiton';
import { accountState, loadingState } from '../../state/recoilState';



function PageLogin() {
    const authController = new Authentication();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

    const [login, setLogin] = useRecoilState(accountState);
    const [loading, setLoading] = useRecoilState(loadingState);
    const [state, setState] = useState({
        login: {
            hasError: false,
            message: "",
        }
    });
    const account = useRecoilValue(accountState);
    const navigate = useNavigate();

    const { colorMode, toggleColorMode } = useColorMode();
    const size = useBreakpointValue({ base: 'md', md: 'lg' });
    const width = useBreakpointValue({ base: '44px', md: '60px' })
    const height = useBreakpointValue({ base: '44px', md: '60px' });
    const blurWidth = useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' });
    const blurZIndex = useBreakpointValue({ base: -1, md: -1, lg: 0 });

    const onSubmit = async (data) => {
        const { email, password } = data;
        setLoading(true);
        let login = await authController.login({ email, password });
        setLoading(false);
        setLogin(login);

        if (login == 400) return setState(prevState => ({
            ...prevState,
            login: {
                hasError: true,
                message: "Invalid email and/or password"
            }
        }));

        if (login == 500) return setState(prevState => ({
            ...prevState,
            login: {
                hasError: true,
                message: "Sorry, something went wrong. It's not you, It's us"
            }
        }));

        navigate("/artist/main",
            { replace: true }
        );

    }

    const handleNavigate = () => {
        navigate("/registration",
            { replace: true }
        );
    }

    const registerEmail = {
        ...register("email", {
            required: {
                value: true,
                message: "Email is required"
            }
        })
    };
    const registerPassword = {
        ...register("password", {
            required: {
                value: true,
                message: "Password is required"
            }
        })
    };

    const emailError = errors.email && <Alert status='error' borderRadius={"lg"} color={"black"}>
        <AlertIcon />
        {errors.email.message}
    </Alert>;

    const passwordError = errors.password && <Alert status='error' borderRadius={"lg"} color={"black"}>
        <AlertIcon />
        {errors.password.message}
    </Alert>;

    const loginError = state.login.hasError == true ? <ScaleFade
        initialScale={0.6}
        in={state.login.hasError}>

        <Alert status='error' borderRadius={"lg"} color={"black"}>
            <AlertIcon />
            <AlertDescription>{state.login.message} </AlertDescription>
        </Alert>
    </ScaleFade> : <></>;

    return (
        <Box position={'relative'}>
            <Container
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}>
                <Stack spacing={{ base: 10, md: 20 }}>
                    <Heading
                        lineHeight={1.1}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                        Upload&nbsp;
                        <Text
                            as={'span'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            bgClip="text">
                            &
                        </Text>&nbsp;
                        sell your artwork alongside well-known artists
                    </Heading>
                    <Stack direction={'row'} spacing={4} align={'center'}>
                        <AvatarGroup>
                            {avatars.map((avatar) => (
                                <Tooltip key={avatar.name}
                                    hasArrow
                                    label={avatar.name}
                                    bg='black'
                                    color={"white"}>
                                    <Avatar
                                        name={avatar.name}
                                        src={avatar.url}
                                        size={size}
                                        position={'relative'}
                                        zIndex={2}
                                        _before={{
                                            content: '""',
                                            width: 'full',
                                            height: 'full',
                                            rounded: 'full',
                                            transform: 'scale(1.125)',
                                            bgGradient: 'linear(to-bl, red.400,pink.400)',
                                            position: 'absolute',
                                            zIndex: -1,
                                            top: 0,
                                            left: 0,
                                        }}
                                    />
                                </Tooltip>
                            ))}
                        </AvatarGroup>
                        <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
                            +
                        </Text>
                        <Flex
                            align={'center'}
                            justify={'center'}
                            fontFamily={'heading'}
                            fontSize={{ base: 'sm', md: 'lg' }}
                            bg={'gray.800'}
                            color={'white'}
                            rounded={'full'}
                            width={width}
                            height={height}
                            position={'relative'}
                            _before={{
                                content: '""',
                                width: 'full',
                                height: 'full',
                                rounded: 'full',
                                transform: 'scale(1.125)',
                                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                                position: 'absolute',
                                zIndex: -1,
                                top: 0,
                                left: 0,
                            }}>
                            YOU
                        </Flex>
                    </Stack>
                </Stack>
                <Stack
                    bg={'gray.50'}
                    rounded={'xl'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: 'lg' }}>
                    <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                            Join our community
                            <Text
                                as={'span'}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                bgClip="text">
                                !
                            </Text>
                        </Heading>
                        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                            We are looking for amazing artists just like you ! Join our community and earn money while doing your hobbies.
                        </Text>
                    </Stack>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <FormControl isInvalid={errors.name}>
                            <Box mt={10}>
                                <Stack spacing={4}>
                                    <Input
                                        id="email"
                                        isInvalid={state.login.hasError || errors.email}
                                        placeholder="example@email.com"
                                        bg={'gray.100'}
                                        border={0}
                                        color={'gray.500'}
                                        _placeholder={{
                                            color: 'gray.500',
                                        }}
                                        {...registerEmail} />
                                    {emailError}
                                    <Input
                                        id="password"

                                        isInvalid={state.login.hasError || errors.password}
                                        type={"password"}
                                        placeholder="Password"
                                        bg={'gray.100'}
                                        border={0}
                                        color={'gray.500'}
                                        _placeholder={{
                                            color: 'gray.500',
                                        }}
                                        {...registerPassword} />
                                    {passwordError}
                                    {loginError}


                                </Stack>
                                <Button
                                    fontFamily={'heading'}
                                    mt={12}
                                    w={'full'}
                                    bg={'gray.200'}
                                    color={'gray.800'}
                                    type={'button'}
                                    onClick={() => handleNavigate()}>
                                    Don't have account?
                                </Button>
                                <Button
                                    fontFamily={'heading'}
                                    mt={4}
                                    w={'full'}
                                    bgGradient="linear(to-r, red.400,pink.400)"
                                    color={'white'}
                                    _hover={{
                                        bgGradient: 'linear(to-r, red.400,pink.400)',
                                        boxShadow: 'xl',
                                    }}
                                    type='submit'  >
                                    Sign in
                                </Button>
                            </Box>

                        </FormControl>
                    </form>

                </Stack>
            </Container>

            <Blur
                position={'absolute'}
                top={-10}
                left={-10}
                width={blurWidth}
                zIndex={blurZIndex}
                style={{ filter: 'blur(70px)' }} />
        </Box>
    );
}

export default PageLogin;