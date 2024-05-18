import { HStack, VStack, Text, ScrollView, FlatList, useToast } from "native-base";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

// Componentes
import { HomeHeader } from "../components/HomeHeader";
import { PetsCard } from "../components/PetsCard";
import { Filter } from "../components/Filter";

// imagens para o botao de filtro e para os cardes (para os cardes serão temporarios)
import GatoPNG from '../assets/gato.png'
import CachorroPNG from '../assets/cachorro.png'
import { AppErrors } from "../utils/appErrors";
import { api } from "../services/api";
import { PetsDTO } from "../dtos/PetsDTO";

export function Home() {
    const toast = useToast()
    const [pets, setPets] = useState<PetsDTO[]>([])
    
    async function findPets(){
        try {
            const response = await api.get('/pet/list', { params: {page: '1'}})
            setPets(response.data.pet)
        } catch (err) {
            const isAppError = err instanceof AppErrors;
            const title = isAppError ? err.message : 'Não foi possível carregar os exercícios';
    
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    useFocusEffect(
        useCallback(() => {
            findPets()
        }, [])
    )

    return(
        <ScrollView _contentContainerStyle={{ pb: 8 }}>
            <VStack flex={1} >
                <HStack width='100%' alignItems={"center"} height={32} background={"blue.100"}>
                    <HomeHeader />
                </HStack>
                {/* Bpotão de ffiltro */}
                <HStack justifyContent={"center"} m={5}>
                    <Filter img={GatoPNG} name="gato"/>
                    <Filter img={CachorroPNG} name="dog"/>
                </HStack>
                {/* Card com imagens e descrição de alguns pets */}
                <VStack>
                    <Text color={"blue.500"} fontSize={20} marginLeft={10}>Destaque</Text>

                    <FlatList
                        data={pets}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <PetsCard data={item} ></PetsCard>
                        )}
                     />
                </VStack>
            </VStack>
        </ScrollView>
    );
}