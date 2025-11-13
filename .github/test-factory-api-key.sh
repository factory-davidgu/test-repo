#!/bin/bash
# Test script for FACTORY_API_KEY configuration
# This script helps verify your FACTORY_API_KEY is properly set up

set -e

echo "================================================"
echo "FACTORY_API_KEY Configuration Test"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check if environment variable is set
echo "Test 1: Checking if FACTORY_API_KEY is set..."
if [ -n "$FACTORY_API_KEY" ]; then
    echo -e "${GREEN}✅ FACTORY_API_KEY is set${NC}"
    echo "   Length: ${#FACTORY_API_KEY} characters"
    echo "   First 4 characters: ${FACTORY_API_KEY:0:4}..."
else
    echo -e "${RED}❌ FACTORY_API_KEY is NOT set${NC}"
    echo ""
    echo "To fix this, run one of the following:"
    echo "  export FACTORY_API_KEY='your-key-here'"
    echo "  source .env  # if you have a .env file"
    echo ""
    echo "Get your API key from: https://app.factory.ai"
    exit 1
fi

echo ""

# Test 2: Check if Droid CLI is installed
echo "Test 2: Checking if Droid CLI is installed..."
if command -v droid &> /dev/null; then
    echo -e "${GREEN}✅ Droid CLI is installed${NC}"
    droid --version
else
    echo -e "${YELLOW}⚠️  Droid CLI is not installed${NC}"
    echo ""
    echo "To install, run:"
    echo "  curl -fsSL https://app.factory.ai/cli | sh"
    echo ""
    echo "Skipping remaining tests..."
    exit 0
fi

echo ""

# Test 3: Test basic Droid CLI functionality
echo "Test 3: Testing Droid CLI basic functionality..."
if droid --help > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Droid CLI help command works${NC}"
else
    echo -e "${RED}❌ Droid CLI help command failed${NC}"
    exit 1
fi

echo ""

# Test 4: Test authentication (optional - requires API call)
echo "Test 4: Testing Droid CLI authentication (optional)..."
echo "This will make a real API call. Continue? (y/N)"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "Testing with a simple command..."
    if droid exec "What is 2+2?" > /tmp/droid-test-output.txt 2>&1; then
        echo -e "${GREEN}✅ Droid CLI authentication successful${NC}"
        echo "Response preview:"
        head -n 5 /tmp/droid-test-output.txt
        rm -f /tmp/droid-test-output.txt
    else
        echo -e "${RED}❌ Droid CLI authentication failed${NC}"
        echo "Error output:"
        cat /tmp/droid-test-output.txt
        rm -f /tmp/droid-test-output.txt
        exit 1
    fi
else
    echo "Skipping authentication test."
fi

echo ""
echo "================================================"
echo "Configuration Test Complete!"
echo "================================================"
echo ""
echo -e "${GREEN}All tests passed!${NC}"
echo ""
echo "You can now use Droid CLI commands like:"
echo "  droid exec \"analyze this codebase\""
echo "  droid exec --auto low \"fix typos in README.md\""
echo ""
echo "For more information, see:"
echo "  .github/FACTORY_API_KEY_STATUS.md"
echo "  .github/SECRET_MANAGEMENT.md"
echo ""
