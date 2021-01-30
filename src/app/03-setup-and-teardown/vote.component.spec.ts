import { VoteComponent } from './vote.component';

xdescribe('VoteComponent', () => {
	let component: VoteComponent;

	beforeEach(() => {
		component = new VoteComponent();
	});

	it('Should increment totalVotes when upvoted', () => {
		component.upVote();

		expect(component.totalVotes).toBe(1);
	});

	it('Should decrement totalVotes when downvoted', () => {
		component.downVote();

		expect(component.totalVotes).toBe(-1);
	});
});
