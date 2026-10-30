# Future Idea: Deep Dependency License Checker

Currently, the app only checks the license of the top-level package. But an MIT-licensed package can easily pull in a GPL dependency 3 levels deep. 

The Idea:
Add a feature to traverse the entire dependency tree. 
- Map out all nested licenses.
- Flag or block the package if any sub-dependency violates the commercial rule.

It requires heavier backend caching, but it solves the actual legal risk instead of just checking the surface.