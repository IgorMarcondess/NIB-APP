import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native';
import { fetchDentalNews } from '../services/noticiasService';

type Noticia = {
  link: string;
  title?: string;
  image_url?: string;
  description?: string;
};

const CardNoticias = () => {
  const [news, setNews] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      const fetchedNews = await fetchDentalNews();
      //console.log('Fetched news:', fetchedNews);
      setNews(fetchedNews);
      setLoading(false);
    };

    loadNews();
  }, []);

  if (loading) {return <ActivityIndicator size="large" className="mt-10" />;}

  const renderItem = ({ item }: { item: Noticia }) => (
    <View className="w-[18.75rem] h-[30rem] rounded-2xl overflow-hidden bg-white border border-gray-300 mr-4">

      <View className="items-center justify-center h-[12.5rem] bg-gray-200">
        {item.image_url ? (
          <Image source={{ uri: item.image_url }} className="w-full h-full" />
        ) : (<Text className="text-center font-bold text-blue-800">Imagem API</Text>)}
      </View>

      <View className="h-[15.5rem] bg-white px-4 py-2">
        {item.title && (<Text className="text-[#0056A7] font-bold text-lg text-center mb-1">{item.title}</Text>
        )}

        <ScrollView>
          <Text className="text-center font-medium text-[#0056A7] text-sm">{item.description || 'Texto API'}</Text>
        </ScrollView>
      </View>
    </View>
  );

  return (
    <FlatList //PAGER VIEW não funcionou 
      data={news}
      keyExtractor={(item) => item.link}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
    />
  );
};

export default CardNoticias;
