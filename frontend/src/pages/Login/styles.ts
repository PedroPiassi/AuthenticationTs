import { Button } from '@mui/material';
import styled from 'styled-components';

interface SectionProps {
    bgColor?: string;
}


export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0.5rem;
`;

export const Section = styled.div<SectionProps>`
    width: 50%;
    height: 100%;
    background-color: ${props => props.bgColor ? props.bgColor : 'transparent'};
    border-radius: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.bgColor ? '#fff' : '#000'};
`;

export const Title = styled.h1`
    text-align: center;
    font-size: 1.5rem;
`;

export const Form = styled.form`
   width: 18.75rem;

   > * {
        margin-bottom: 1rem;
    }

    > *:last-child {
        margin-bottom: 0;
    }
`;

export const InputGroup = styled.div`
   margin-bottom: 1.5rem;
`;

export const ButtonStyled = styled(Button)`
    background-color: #004080 !important;
    text-transform: none !important;
`;

export const GroupButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
        color: #004080;
        font-size: 1rem;
    }
`;


