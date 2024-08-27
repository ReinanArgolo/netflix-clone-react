import styled from 'styled-components'

const FooterContainer = styled.div`
    background-color: black;
    color: white;
    text-align: center;
    padding: 20px;
    bottom: 0;
   

    @media (max-width: 768px) {
        width: 100%;
        padding: 150px 0px;
    }
`

const Duvidas = styled.div`
    margin-bottom: 20px;
`

const Itens = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const Ul = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

const Li = styled.li`
    display: block;
    margin: 0 10px;
    text-align: left;
`   

export default function Footer() {
    return (
        <FooterContainer>
            <Duvidas>
                <p>DUVIDAS? LIGUE 0800 591 8942</p>
            </Duvidas>

            <Itens>
                <Ul>
                    <Li><a href="">Perguntas Frequentes</a></Li>
                    <Li><a href="">Termos de Uso</a></Li>
                    <Li><a href="">Preferência</a></Li>
                </Ul>

                <Ul>
                    <Li><a href="">Central de Ajuda</a></Li>
                    <Li><a href="">Privacidade</a></Li>
                    <Li><a href="">Informações corporativas</a></Li>
                </Ul>
            </Itens>

            
        </FooterContainer>
    )
}