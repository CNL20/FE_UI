from codebase_agent import CodebaseAgent
import os
from dotenv import load_dotenv

def main():
    # Load environment variables
    load_dotenv()
    
    # Initialize the agent
    agent = CodebaseAgent()
    
    # Example: Analyze a single file
    try:
        # Replace with your file path
        file_path = "example.py"
        analysis = agent.analyze_file(file_path)
        print(f"\nAnalysis of {file_path}:")
        print(f"Language: {analysis.language}")
        print(f"Dependencies: {analysis.dependencies}")
        print(f"Complexity: {analysis.complexity}")
        print(f"Summary: {analysis.summary}")
    except Exception as e:
        print(f"Error analyzing file: {str(e)}")
    
    # Example: Analyze a directory
    try:
        # Replace with your directory path
        directory_path = "."
        analyses = agent.analyze_directory(directory_path)
        print(f"\nDirectory Analysis Results:")
        for analysis in analyses:
            print(f"\nFile: {analysis.file_path}")
            print(f"Language: {analysis.language}")
            print(f"Complexity: {analysis.complexity}")
            print(f"Summary: {analysis.summary}")
    except Exception as e:
        print(f"Error analyzing directory: {str(e)}")

if __name__ == "__main__":
    main() 