import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { getMatchStatus } from '../../utils/functions';

export const MatchDisplay = ({ match }: { match: any }) => {
	if (!match) return <></>;
	return (
		<Box p={6} border="1px solid" borderColor="gray.200" borderRadius={8} flexShrink={0} w="300px">
			<Flex gap={4} alignItems="stretch">
				<Flex direction="column" gap={2} w="60%">
					<Flex alignItems="center">
						<Text>{match.homeTeam.name}</Text>
						<Box
							bg="purple.100"
							borderRadius={4}
							w="32px"
							h="32px"
							ml="auto"
							textAlign="center"
							fontSize="20px"
							fontWeight="500"
						>
							{match.matchStatusId === 1 ? match.result.homeScore90 : 0}
						</Box>
					</Flex>
					<Flex alignItems="center">
						<Text>{match.awayTeam.name}</Text>
						<Box
							bg="purple.100"
							borderRadius={4}
							w="32px"
							h="32px"
							ml="auto"
							textAlign="center"
							fontSize="20px"
							fontWeight="500"
						>
							{match.matchStatusId === 1 ? match.result.awayScore90 : 0}
						</Box>
					</Flex>
				</Flex>
				<Flex
					direction="column"
					borderLeft="2px solid"
					pl={4}
					borderColor="gray.300"
					justify="center"
					alignItems="center"
				>
					<Text fontSize="14px" color="gray.700">
						Status
					</Text>
					<Text>{getMatchStatus(match)}</Text>
				</Flex>
			</Flex>
		</Box>
	);
};
