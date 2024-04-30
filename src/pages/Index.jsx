import { useState } from 'react';
import { Box, Input, Button, Text, Image, VStack } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [songData, setSongData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=1`, {
      headers: {
        Authorization: `Bearer YOUR_ACCESS_TOKEN` // Token needs to be generated server-side to keep client credentials secure
      }
    });
    const data = await response.json();
    setSongData(data.tracks.items[0]);
    setLoading(false);
  };

  return (
    <VStack spacing={4} align="center" justify="center" minHeight="100vh" padding={5}>
      <Text fontSize="2xl" fontWeight="bold">Spotify Song Search</Text>
      <Box width="100%" maxWidth="480px">
        <Input placeholder="Search for a song" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button leftIcon={<FaSearch />} colorScheme="teal" onClick={handleSearch} isLoading={loading}>
          Search
        </Button>
      </Box>
      {songData && (
        <Box textAlign="center" marginTop={5}>
          <Text fontSize="xl" fontWeight="bold">{songData.name}</Text>
          <Text fontSize="md">{songData.artists.map(artist => artist.name).join(', ')}</Text>
          <Image src={songData.album.images[0].url} alt="Album cover" boxSize="150px" objectFit="cover" borderRadius="full" marginY={3} />
          <audio controls src={songData.preview_url}>
            Your browser does not support the audio element.
          </audio>
        </Box>
      )}
    </VStack>
  );
};

export default Index;