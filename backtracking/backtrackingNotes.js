
/*
The backtracking pseudocode template for implementing the backtracking algorithms:

#Python
def backtrack(candidate):
    if find_solution(candidate):
        output(candidate)
        return
    
    # iterate all possible candidates.
    for next_candidate in list_of_candidates:
        if is_valid(next_candidate):
            # try this partial candidate solution
            place(next_candidate)
            # given the candidate, explore further.
            backtrack(next_candidate)
            # backtrack
            remove(next_candidate)

Overall, the enumeration of candidates is done in two levels: 1). at the first level, the function is implemented as recursion. At each occurrence of recursion, the function is one step further to the final solution.  2). as the second level, within the recursion, we have an iteration that allows us to explore all the candidates that are of the same progress to the final solution.

The backtracking should happen at the level of the iteration within the recursion. 

Unlike brute-force search, in backtracking algorithms we are often able to determine if a partial solution candidate is worth exploring further (i.e. is_valid(next_candidate)), which allows us to prune the search zones. This is also known as the constraint, e.g. the attacking zone of queen in N-queen game. 

There are two symmetric functions that allow us to mark the decision (place(candidate)) and revert the decision (remove(candidate)).              

Notes from Aditya Verma:
 - Recursion is parent of Backtracking
 - Number of choices are large
 - controlled recursion
 - Pass by reference
*/            
Following items needs fixes
 - 4 Broken Kitchen Racks which needs fix. 
 - Master Bathroom flush has leakage and got rusted. The whole sets needs replacement as it might get stuck any day. 
 - Master Bathroom: The small cloth hanger, near to mirror is shaking. It might need new screw or other fixes.
 - Common Bathroom: Bum shower jet leakage.
 - Common bathroom: Mirror may fall as only one its hing is in working condition other has detached from it. 
 - TV Unit glass fixture having issue. The glasses just comes out. total 4 glasses are out and 2 are still there. We would prefer to not use glasses and keee it safe somewhere as it risky with kids in home. 
 - In kids bedroom the sliding net window wheel makes sound. Looks like it had teared out. It would need replacement.

I had also noticed that in hall and Kids bedroom net has minor cuts. I have already attached the. This don't need immediate replacement but wanted to let you know. I have shared the pics in album. 