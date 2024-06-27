import React from 'react';
import './App.css';
import useSWR from 'swr';
import {
	Text,
	Heading,
	Flex,
	Box,
	Center,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
} from '@chakra-ui/react';

import { MatchDisplay } from './components/MatchDisplay';
import { fetcher } from './utils/functions';

function App() {
	const { data: groupA } = useSWR('stages/691296/matches/', fetcher);
	const { data: groupB } = useSWR('stages/691297/matches/', fetcher);
	const { data: groupC } = useSWR('stages/691300/matches/', fetcher);
	const { data: groupD } = useSWR('stages/691298/matches/', fetcher);
	const { data: groupE } = useSWR('stages/691299/matches/', fetcher);
	const { data: groupF } = useSWR('stages/691301/matches/', fetcher);

	if (!groupA || !groupB || !groupC || !groupD || !groupE || !groupF) return <></>;

	const allMatches = groupA.concat(groupB, groupC, groupD, groupE, groupF);
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	// reduce objects to just the timestamp (w/o time data) -> put into Set for unique values -> turn into array again and sort the dates
	const sortedDates = [
		...allMatches.reduce((acc: Set<string>, match: any) => acc.add(match.timestamp.split('T')[0]), new Set<string>()),
	].sort();

	const getDefaultIndexes = () => {
		/* just for testing
		const twoDaysAgo = new Date();
		twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    twoDaysAgo.setHours(0,0,0,0)
     */
		const futureDates = sortedDates.filter((date) => new Date(date) >= today);
		return futureDates.map((date, index) => sortedDates.length - index - 1);
	};

	return (
		<Center w="100%" pb={24} fontFamily="verdana" px={8}>
			<Box w="1000px">
				<Box pt={4} mb={8}>
					<Heading as="h1">European Championship 2024 Group Stage</Heading>
				</Box>
				<Flex gap={4} mb={2}>
					<Text>🔴 Ongoing</Text>
					<Text>🏁 Finished</Text>
				</Flex>
				{sortedDates && (
					<Accordion w="100%" allowMultiple defaultIndex={getDefaultIndexes()}>
						{sortedDates.map((date) => (
							<AccordionItem key={date}>
								<AccordionButton w="100%">
									{new Date(date).toDateString()}
									{new Date(date) < today && ' 🏁'}
									{allMatches.find(
										(match: any) => match.timestamp.split('T')[0] === date && match.matchStatusId === 7
									) && ' 🔴'}
									<AccordionIcon ml="auto" />
								</AccordionButton>
								<AccordionPanel>
									<Flex gap={4} wrap="wrap">
										{allMatches
											.filter((match: any) => match.timestamp.split('T')[0] === date)
											.map((match: any) => (
												<MatchDisplay key={match.name} match={match} />
											))}
									</Flex>
								</AccordionPanel>
							</AccordionItem>
						))}
					</Accordion>
				)}
			</Box>
		</Center>
	);
}

export default App;
