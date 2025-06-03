import os
from typing import List, Dict, Optional
from pathlib import Path
import openai
from dotenv import load_dotenv
from pydantic import BaseModel

class CodeAnalysis(BaseModel):
    """Model for code analysis results"""
    file_path: str
    language: str
    dependencies: List[str]
    complexity: float
    summary: str

class CodebaseAgent:
    def __init__(self, api_key: Optional[str] = None):
        """Initialize the codebase agent with OpenAI API key"""
        load_dotenv()
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("OpenAI API key is required")
        openai.api_key = self.api_key

    def analyze_file(self, file_path: str) -> CodeAnalysis:
        """Analyze a single file and return its analysis"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Determine file language based on extension
            extension = Path(file_path).suffix.lower()
            language = self._get_language_from_extension(extension)
            
            # Analyze code using OpenAI
            analysis = self._analyze_with_openai(content, language)
            
            return CodeAnalysis(
                file_path=file_path,
                language=language,
                dependencies=self._extract_dependencies(content, language),
                complexity=self._calculate_complexity(content),
                summary=analysis
            )
        except Exception as e:
            raise Exception(f"Error analyzing file {file_path}: {str(e)}")

    def analyze_directory(self, directory_path: str) -> List[CodeAnalysis]:
        """Analyze all code files in a directory"""
        analyses = []
        for root, _, files in os.walk(directory_path):
            for file in files:
                if self._is_code_file(file):
                    file_path = os.path.join(root, file)
                    try:
                        analysis = self.analyze_file(file_path)
                        analyses.append(analysis)
                    except Exception as e:
                        print(f"Warning: Could not analyze {file_path}: {str(e)}")
        return analyses

    def _get_language_from_extension(self, extension: str) -> str:
        """Map file extension to programming language"""
        language_map = {
            '.py': 'Python',
            '.js': 'JavaScript',
            '.ts': 'TypeScript',
            '.java': 'Java',
            '.cpp': 'C++',
            '.c': 'C',
            '.go': 'Go',
            '.rb': 'Ruby',
            '.php': 'PHP',
            '.swift': 'Swift',
            '.kt': 'Kotlin',
            '.rs': 'Rust'
        }
        return language_map.get(extension, 'Unknown')

    def _is_code_file(self, filename: str) -> bool:
        """Check if a file is a code file based on extension"""
        code_extensions = {
            '.py', '.js', '.ts', '.java', '.cpp', '.c', '.go',
            '.rb', '.php', '.swift', '.kt', '.rs', '.html', '.css'
        }
        return Path(filename).suffix.lower() in code_extensions

    def _analyze_with_openai(self, content: str, language: str) -> str:
        """Analyze code using OpenAI API"""
        try:
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": f"You are a code analyzer. Analyze this {language} code and provide a brief summary."},
                    {"role": "user", "content": content}
                ],
                max_tokens=150
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error analyzing code: {str(e)}"

    def _extract_dependencies(self, content: str, language: str) -> List[str]:
        """Extract dependencies from code based on language"""
        dependencies = []
        if language == 'Python':
            # Look for import statements
            for line in content.split('\n'):
                if line.startswith(('import ', 'from ')):
                    dependencies.append(line.strip())
        elif language == 'JavaScript':
            # Look for require or import statements
            for line in content.split('\n'):
                if 'require(' in line or 'import ' in line:
                    dependencies.append(line.strip())
        return dependencies

    def _calculate_complexity(self, content: str) -> float:
        """Calculate code complexity (simplified version)"""
        lines = content.split('\n')
        non_empty_lines = [line for line in lines if line.strip()]
        return len(non_empty_lines) / 100  # Simple complexity metric 